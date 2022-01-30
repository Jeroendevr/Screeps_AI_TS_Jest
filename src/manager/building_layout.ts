
function building_layout(pos: RoomPosition): [number, number, string] {
    // Returns an array with position relative to the spawn where a certain structure should be placed
    return gcl_lv2_structures()

}

function gcl_lv2_structures(): [number, number, string] {
    return [+1, -1, STRUCTURE_EXTENSION]
}


export { building_layout }

