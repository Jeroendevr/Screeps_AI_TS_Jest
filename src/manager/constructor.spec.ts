import { mockInstanceOf, mockGlobal } from "screeps-jest";
import { mockRoomPositionConstructor } from "screeps-jest/dist/src/mocking";
import { building_layout } from "./building_layout";




mockRoomPositionConstructor(global);
const myRoompos = mockInstanceOf<RoomPosition>({
    x: 20,
    y: 20
})

const wantedRoomPos = mockInstanceOf<RoomPosition>({
    x: 21,
    y: 19,
})


// it("suitable extension ", () => {
//     expect(find_suitable_extension_site(myRoompos, "WNH1")).toEqual(wantedRoomPos);
// })

it("returns building layout", () => {
    expect(building_layout(myRoompos)).toEqual([21, 19, "extension"])
    expect(building_layout(myRoompos)).toEqual([21, 19, "extension"])
})
