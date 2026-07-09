/** Local photos from /public/images — mapped to site sections */

const base = '/images';

export const photos = {
  abstractTealMetallic: `${base}/photo_2026-07-08_12-34-17.jpg`,
  treeStudio: `${base}/photo_2026-07-08_12-34-21.jpg`,
  treeFramed: `${base}/photo_2026-07-08_12-34-23.jpg`,
  treeWall: `${base}/photo_2026-07-08_12-34-25.jpg`,
  treeAngle: `${base}/photo_2026-07-08_12-34-27.jpg`,
  sunsetAngle: `${base}/photo_2026-07-08_12-34-33.jpg`,
  sunsetStudio: `${base}/photo_2026-07-08_12-34-35.jpg`,
  abstractCircle: `${base}/photo_2026-07-08_12-34-37.jpg`,
  abstractHorizon: `${base}/photo_2026-07-08_12-34-39.jpg`,
  cityscapeAngle: `${base}/photo_2026-07-08_12-34-41.jpg`,
  darkTealVertical: `${base}/photo_2026-07-08_12-34-42.jpg`,
  floralHeadFront: `${base}/photo_2026-07-08_12-34-44.jpg`,
  sunsetFront: `${base}/photo_2026-07-08_12-34-45.jpg`,
  loveFigure: `${base}/photo_2026-07-08_12-34-46.jpg`,
  lilacs: `${base}/photo_2026-07-08_12-34-48.jpg`,
  moonLandscape: `${base}/photo_2026-07-08_12-34-49.jpg`,
  floralHeadOutdoor: `${base}/photo_2026-07-08_12-34-51.jpg`,
  floralHeadClose: `${base}/photo_2026-07-08_12-34-56.jpg`,
  cityscapeFront: `${base}/photo_2026-07-08_12-34-57.jpg`,
  colorfulPortrait: `${base}/photo_2026-07-08_12-34-59.jpg`,
  oceanWoman: `${base}/photo_2026-07-08_12-35-02.jpg`,
} as const;

export type PhotoKey = keyof typeof photos;
