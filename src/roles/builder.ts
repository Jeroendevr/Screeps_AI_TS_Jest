import { constructionManager } from "manager/constructor";

interface Builder extends Creep {
  memory: BuilderMemory;
}

interface BuilderMemory extends CreepMemory {
  building: boolean;
  role: 'builder';
}

const roleBuilder = {
  run(creep: Builder): void {

    if (constructionManager.possible_to_build_tower()) {
      //
    }
    else {
      //TODO:
    }

    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      work_on_construction_sites(creep)
    } else {
      gather_resource(creep)
    }
  }
};

function gather_resource(creep: Builder): void {
  // Check if spawn if full

  const spawn = creep.room.find(FIND_MY_SPAWNS)
  if (spawn.length) {
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
}

function work_on_construction_sites(creep: Builder): void {
  //TODO extensions before roads
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length) {
    const extensions = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: { structureType: STRUCTURE_EXTENSION } })
    // console.log(extensions)
    if (extensions.length) {
      move_to_target(creep, extensions)
    }
    else {
      move_to_target(creep, targets)
    };
  }
}

function move_to_target(creep: Builder, targets: ConstructionSite[]): void {
  if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
  }
}

export {
  roleBuilder,
  work_on_construction_sites,
  Builder,
  move_to_target,
};

