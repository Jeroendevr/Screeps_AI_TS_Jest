import { InfraManager2 } from "manager/manager.infra2";
import { spawnManager } from "manager/manager.spawn";
import { Builder, roleBuilder } from "roles/builder";
import { BuilderClass, BuilderRole } from "roles/builderv2";
import { roleHarvester } from "roles/harvester";
import { RemoveConstructionSite } from "utils/remove_constuctsite";
import { Koerier, roleKoerier } from "roles/koerier";
import roleUpgrader, { Upgrader } from "roles/upgrader";
import ErrorMapper from "utils/ErrorMapper";
import { runTower } from "./tower";
import { TowerVisual } from "visuals/tower_vis";
import { ConstructionManager } from "manager/manager.construction";

declare global {
  interface CreepMemory {
    role: string;
  }
}

function unwrappedLoop(): void {
  // console.log(`Current game tick is ${Game.time}`);
  cleanMemory();
  runAllTowers();
  runCreep();
  spawnManager.run();
  run_owned_rooms();

  // Util section
  // run_nonstandard_utils()
}

function cleanMemory(): void {
  // Automatically delete memory of missing creeps
  Object.keys(Memory.creeps)
    .filter(name => !(name in Game.creeps))
    .forEach(name => delete Memory.creeps[name]);
}

function run_owned_rooms(): void {
  for (const room in Game.rooms) {
    if (Game.rooms[room].controller?.my == true) {
      new InfraManager2(room).run();
      new ConstructionManager(room).run();
    }
  }
}

function runAllTowers(): void {
  Object.values(Game.rooms).forEach(room => {
    if (room.controller?.my) {
      const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

      towers.forEach(tower => {
        runTower(tower);
        new TowerVisual(tower).visualize();
      });
    }
  });
}

function runCreep(): void {
  /**
   * Init the classes
   */

  Object.values(Game.creeps).forEach(creep => {
    if (creep.memory.role === "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === "upgrader") {
      roleUpgrader.run(creep as Upgrader);
    }
    if (creep.memory.role === "builder") {
      try {
        roleBuilder.run(creep as Builder);
        const Builder = new BuilderClass();
        Builder.run(creep as BuilderRole);
      } catch (error) {
        console.log(creep.memory.role + error);
      }
    }
    if (creep.memory.role === "koerier") {
      roleKoerier.run(creep as Koerier);
    }
  });
}

function run_nonstandard_utils() {
  //Mostly run once
  new RemoveConstructionSite("E3S34").run();
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, cleanMemory, runCreep, runAllTowers };
