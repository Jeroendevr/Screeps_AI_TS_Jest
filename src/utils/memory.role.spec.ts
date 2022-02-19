import { mockGlobal, mockInstanceOf } from 'screeps-jest';
import { countRole } from "./memory.role";

jest.mock('roles/harvester');

const harvester = mockInstanceOf<Creep>({ memory: { role: 'harvester' } });

describe('memory role module', () => {
    describe('count role', () => {
        mockGlobal<Game>('Game', {
            creeps: {
                harvester,
            }
        })

        test('is two', () => {
            expect(countRole('harvester')).toEqual(1)
        })
    }
    )
})
