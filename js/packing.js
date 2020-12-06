/**
 * This function returns a position for a potential rectangle in a 2d grid.
 * @param itemsInGrid list of dicts: [{x:int,y:int,w:int,h:int}] representing current itemsInGrid in the grid
 * @param gh (max ch of available space)
 * @param gw  (max cw fo available space)
 * @param cw (cw of element to pack)
 * @param ch (ch of element to pack)
 * @return {number[]} (pos(x,y)
 */
function findSpace(itemsInGrid, gh, gw, cw, ch) {
    // identify max_cw,max_ch
    if (itemsInGrid.length <= 0) {
        console.log("NO ITEMS returning 0,0")
        return [0, 0]
    }
    console.log("FINDING SPACE ")
    console.log("======================")
    console.log("componnents: ", itemsInGrid)
    console.log("grid cw:", gw)
    console.log("grid ch:", gh)
    //    go linearly

    let pX = 0;
    let pY = 0;
    let found = false;
    let y = 0;
    let x = 0;
    while (x < gw) {
        while (y < gh) {
            if (is_free(x, y, cw, ch, itemsInGrid)) {
                return [x, y]
            }

            y += 1
        }
        x += 1
    }
    return [pX, pY]
}

function is_free(x, y, w, h, items) {
    for (let c of items) {
        if (x + w > c.x && c.x + c.w > x) {
            if (y + h > c.y && c.y + c.h > y) {
                return false
            }
        }
    }
    return true
}

export default findSpace