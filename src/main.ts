import { constructionManager } from 'manager/constructor';
import { infraManager } from 'manager/manager.infra';
import { spawnManager } from 'manager/manager.spawn';
import { Builder, roleBuilder } from 'roles/builder';
import { roleHarvester } from 'roles/harvester';
import { Koerier, roleKoerier } from 'roles/koerier';
import roleUpgrader, { Upgrader } from 'roles/upgrader';
import ErrorMapper from 'utils/ErrorMapper';
import { runTower } from './tower';

declare global {
  interface CreepMemory {
    role: string;
  }
}

function unwrappedLoop(): void {
  // console.log(`Current game tick is ${Game.time}`);
  cleanMemory()
  runAllTowers()
  runCreep()
  spawnManager.spawn()
  infraManager.run()
  constructionManager.run()
  // console.log(Game.rooms['E54N17'].find(FIND_CONSTRUCTION_SITES, { filter: { structureType: STRUCTURE_EXTRACTOR } }).length)
}

function cleanMemory(): void {
  // Automatically delete memory of missing creeps
  Object.keys(Memory.creeps)
    .filter(name => !(name in Game.creeps))
    .forEach(name => delete Memory.creeps[name]);
}



function runAllTowers(): void {
  Object.values(Game.rooms).forEach(room => {
    if (room.controller?.my) {
      const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

      towers.forEach(tower => {
        runTower(tower);
      });
    }
  })
}

function runCreep(): void {
  Object.values(Game.creeps).forEach(creep => {
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep as Upgrader);
    }
    if (creep.memory.role === 'builder') {
      try {
        roleBuilder.run(creep as Builder);
      } catch (error) {
        console.log(creep.memory.role + error)
      }
    }
    if (creep.memory.role === 'koerier') {
      roleKoerier.run(creep as Koerier);
    }
  });
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export {
  loop,
  cleanMemory,
  runCreep,
  runAllTowers

};
