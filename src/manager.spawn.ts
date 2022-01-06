import { count } from "console"
import { countRole } from "utils/memory.role"

export var spawnManager = {

    /** @param {Creep} creep **/
    spawn: function () {
        type roles = [
            'harvester',
            'builder'
        ]
        const screepAmount = {
            harvester: 3,
            builder: 2,
        }

        const harvesters = countRole('harvester')

        if (harvesters < screepAmount.harvester) {
            var newName: string = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'harvester', } });
        }

        const builders = countRole('builder')

        if (builders < screepAmount.builder) {
            var newName: string = 'Builders' + Game.time;
            console.log('Spwaning new builders: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder', } })

        }
    }
}
