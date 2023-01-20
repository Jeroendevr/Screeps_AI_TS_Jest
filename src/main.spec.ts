import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";
import { mockRoomPositionConstructor } from "screeps-jest/dist/src/mocking";
import { cleanMemory, runCreep } from "./main";
import { roleBuilder } from "./roles/builder";
import { roleHarvester } from "./roles/harvester";
import roleUpgrader from "./roles/upgrader";

jest.mock("roles/builder");
jest.mock("roles/harvester");
jest.mock("roles/upgrader");
jest.mock("tower");

const builder = mockInstanceOf<Creep>({ memory: { role: "builder" } });
const harvester = mockInstanceOf<Creep>({ memory: { role: "harvester" } });
const upgrader = mockInstanceOf<Creep>({ memory: { role: "upgrader" } });

mockRoomPositionConstructor(global);
const ROOM_POS = mockInstanceOf<RoomPosition>({
  x: 1,
  y: 1,
  lookFor: () => []
});

describe("main loop", () => {
  it("runs every creep", () => {
    mockGlobal<Game>("Game", {
      creeps: {
        builder,
        harvester,
        upgrader
      },
      rooms: {},
      time: 1,
      RoomPosition: ROOM_POS
    });
    mockGlobal<Memory>("Memory", { creeps: {} });
    runCreep();
    expect(roleBuilder.run).toHaveBeenCalledWith(builder);
    expect(roleHarvester.run).toHaveBeenCalledWith(harvester);
    expect(roleUpgrader.run).toHaveBeenCalledWith(upgrader);
  });

  it("cleans up the memory from deceased creeps", () => {
    mockGlobal<Game>("Game", {
      creeps: { stillKicking: harvester },
      rooms: {},
      time: 1,
      spawns: {}
    });
    mockGlobal<Memory>("Memory", {
      creeps: {
        dead: { role: "garbage" },
        goner: { role: "waste" },
        stillKicking: harvester.memory
      }
    });
    cleanMemory();
    expect(Memory.creeps).toEqual({ stillKicking: harvester.memory });
  });
});
