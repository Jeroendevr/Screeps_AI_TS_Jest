import { mockInstanceOf } from 'screeps-jest'
import { Harvester } from './harvester'
import { Koerier } from './koerier'

const harv_1 = mockInstanceOf<Harvester>({
    memory: {
        harvesting: true,
        role: 'harvester'
    }
})

const koerier_1 = mockInstanceOf<Koerier>({
    memory: {
        role: 'koerier'
    }
})

const harvester_room = mockInstanceOf<Room>({
    find: {
        FIND_MY_CREEPS: [harv_1, koerier_1]
    }
})

describe('Koerier role', () => {
    it('finds all the harvesters to withdraw energy from', () => {
        const creep = mockInstanceOf<Koerier>({
            memory: {
                // hauling: false,
                role: 'koerier'
            },
            room: harvester_room
        })

    })
})
