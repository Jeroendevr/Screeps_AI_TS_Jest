import { mockInstanceOf } from "screeps-jest";
import { sufficientCapacity } from "./manager.spawn";

describe('spawn manager', () => {
    it('calcs body parts', () => {
        const spawn = mockInstanceOf<StructureSpawn>(
            {
                store:
                {
                    getUsedCapacity: () => 200
                }
            }
        )
        const creepBody: BodyPartConstant[] = [WORK, CARRY, MOVE]
        const creepBigBody: BodyPartConstant[] = [WORK, WORK, CARRY, MOVE]

        expect(sufficientCapacity(spawn, creepBody)).toEqual(true);
        expect(sufficientCapacity(spawn, creepBigBody)).toEqual(false);

    });
})
