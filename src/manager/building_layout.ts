
function building_layout(pos: RoomPosition): [number, number, string] {
    /**
     *
     * @returns [x pos , y pos, A structure constant]
     */
    var next_structure_site = gcl_lv2_structures[0]
    next_structure_site[0] = next_structure_site[0] + pos.x
    next_structure_site[1] = next_structure_site[1] + pos.y

    return next_structure_site
}

const gcl_lv2_structures: [number, number, string][] =
    /*

    */
    [
        [+1, -1, STRUCTURE_EXTENSION]
    ]

export { building_layout }

