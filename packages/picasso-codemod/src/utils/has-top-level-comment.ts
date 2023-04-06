import type { Core, JSCodeshift } from 'jscodeshift'

const hasTopLevelComment = (root: ReturnType<Core>, j: JSCodeshift) => {
  let _hastTopLevelComment = false

  root
    .find(j.Declaration)
    .at(0)
    .forEach(path => {
      const comments = path.value.comments

      if (
        comments &&
        comments.length > 0 &&
        (comments[0] as any).start ===
          0 /* start is coming from recast module */
      ) {
        _hastTopLevelComment = true
      }
    })

  return _hastTopLevelComment
}

export { hasTopLevelComment }
