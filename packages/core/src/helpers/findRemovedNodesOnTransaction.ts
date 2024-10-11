import { Node } from '@tiptap/pm/model'
import { Transaction } from '@tiptap/pm/state'

/**
 * Finds removed nodes on a transaction including text nodes
 * This can be useful to find out if a transaction caused nodes to be removed from the document
 * @param tr The transaction to check for removed nodes
 * @returns An array of objects containing the removed node and the range of the node
 */
export const findRemovedNodesOnTransaction = (tr: Transaction) => {
  const removedNodes: Array<{ node: Node, range: { from: number, to: number } }> = []

  const oldDoc = tr.before
  const newDoc = tr.doc

  // lets check if there are any nodes removed between
  // the old document and the new document
  oldDoc.descendants((node, pos) => {
    // we need to map the old position to the new position
    const afterPos = tr.mapping.map(pos)
    const newDocNode = newDoc.nodeAt(afterPos)

    if (!newDocNode) {
      removedNodes.push({
        node,
        range: {
          from: pos,
          to: pos + node.nodeSize,
        },
      })
    }

    return true
  })

  return removedNodes
}
