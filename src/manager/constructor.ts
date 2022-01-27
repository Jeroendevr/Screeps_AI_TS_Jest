
const constructionManager = {
    run: function (): void {
        const mySpawn = 'Spawn1'
        const mySpawnObj = Game.spawns[mySpawn]
        const roomName = mySpawnObj.room.name
        const location: RoomPosition = find_suitable_extension_site(mySpawnObj.pos, roomName)
        this.createExtenstions(location)
    },
    createExtenstions: function (location: RoomPosition): void {
        location.createConstructionSite(STRUCTURE_EXTENSION)
    }
}

function find_suitable_extension_site(spawn_pos: RoomPosition, roomName: string): RoomPosition {
    let extension_site = new RoomPosition(spawn_pos.x + 1, spawn_pos.y + 1, roomName)
    return extension_site
}

export { constructionManager }
