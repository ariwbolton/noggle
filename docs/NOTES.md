## Notes

All written hastily and without certainty!

### TODOs

1. Implement secure connections
    1. Create self-signed certificate
        1. https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/
    1. Configure Hapi with the cert
    1. Require all sockets to be secure; otherwise, disconnect
1. Implement socketio authentication
    1. Create middleware to initialize sockets as "unauthorized"
    1. Require "login" event to convert socket to authorized
    1. Treat socket as authorized from there on out
    1. Disconnect if user becomes unauthorized for some reason
1. Misc.
   1. Configure eslint-plugin-react (specify React version?)
   1. Setup Postgres
      1. Pick Postgres ORM

### Backend Handlers

1. /user namespace
    1. `user.get`
    1. `user.login`
    1. `user.create` (Ari only)
    1. `user.stats`
    1. `user.game.get`
1. /room namespace
    1. `room.get` - Get room. Throws if not in the room
    1. `room.create` - Must not be an active room owned by the user. Persists
    1. `room.delete` - Persists
    1. `room.invite.create` - Invite users. Triggers notification to users. Persists
    1. `room.invite.accept` - Persists
    1. `room.assignment.delete` - Remove users. Triggers notification. Persists
1. /room/game namespace
    1. `room.game.get` - Get game. Throws if not in the game
    1. `room.game.create` - Requires room. Fails if user is not in the room. Notifies all in room
    1. `room.game.start` - Only room owner can start. Only starts with users who have readyup-ed. Notifies all in room.
    1. `room.game.assignment.readyup` -
        1. Fails if user is not in game, user has already readyup-ed, user has already left
        1. Notifies all in room
    1. `room.game.assignment.leave` - Fails if user is not in game.
    1. `room.game.assignment.word.create`
        - Word must be unique
        - Word must be on the board
        - Game must be active
    1. `room.game.assignment.word.delete`
        - Word must already be submitted
        - Game must be active

### Frontend Handlers

1. /room namespace
    1. `room.invite.created` - Sent to users who were invited
    1. `room.invite.accepted` - Sent to users in a room when someone joins
    1. `room.user.left` - Sent to users in a room when someone leaves
    1. `room.deleted` - Sent to all users in a room
1. /game namespace
    1. `game.initialized`
    1. `game.player.readyupped`
    1. `game.player.left`
    1. `game.started`
    1. `game.ended`

### Models

1. All
    1. `id`
    1. `created_at`
1. `user`
    1. `username`
    1. `login_code`
1. `user_sessions`
    1. `user_id`
    1. `socket_id` - text
    1. `deleted_at` - nullable
1. WS model
    1. `rooms`
        1. `title`
    1. `room_assignments`
        1. `room_id`
        1. `user_id`
        1. `deleted_at`
        1. Constraints
            1. Should only be one active room assignment per user
1. `games`
    1. `board_string`
    1. `start_time` - nullable
    1. `duration` - nullable
    1. `is_scored`
1. `game_assignments`
    1. `user_id`
    1. `game_id`
    1. `deleted_at`
    1. Constraints
        1. UNIQUE (account_id, game_id)
1. `game_words`
    1. `game_assignment_id`
    1. `word` - string - should be lower case
    1. `value` - int - pre-scoring value - May be negative if the value isn't a word!!
    1. `is_valid` - Whether or not the word appears in the board
    1. `is_unique` - Should be null until `games.is_scored` is true
    1. `points` - int - nullable -
    1. Constraints
        1. UNIQUE (game_assignment_id, word)
        1. word is lower case
