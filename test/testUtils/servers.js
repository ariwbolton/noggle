import { Servers } from '../../app/backend/servers.ts'

export default async function initServersUtil() {
    await Servers.init()
}
