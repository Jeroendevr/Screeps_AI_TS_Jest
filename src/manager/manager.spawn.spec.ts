import { mockInstanceOf } from "screeps-jest";
import { sufficientCapacity } from "./manager.spawn";

describe('spawn manager', () => {
    it('calcs body parts', () => {
        const spawn = mockInstanceOf<StructureSpawn>(
            {
                room:
                {
                    energyAvailable: 200
                }
            }
        )
        const creepBody: BodyPartConstant[] = [WORK, CARRY, MOVE]
        const creepBigBody: BodyPartConstant[] = [WORK, WORK, CARRY, MOVE]

        expect(sufficientCapacity(spawn, creepBody)).toEqual(true);
        expect(sufficientCapacity(spawn, creepBigBody)).toEqual(false);

    });
})

const room = mockInstanceOf<Room>(
    {

    }
)

const extension = mockInstanceOf<StructureExtension>(
    {
        store:
        {
            getUsedCapacity: () => 100
        }
    }
)

describe('spawn related functions', () => {
    it('calculates extension energy', () => {

        // expect(extensionCapacity(room)).toEqual(100)
    });

    it('confirms screepAmount reached', () => {

    })


})
