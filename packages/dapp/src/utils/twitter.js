import { twitter } from "./constants/twitter"

const shareTweet = (toFetchFor) => window.open(
  `${twitter.shareIntent}${encodeURIComponent(
    twitter.shareContent.replace('<COLLECTION_LINK>', 'https://' + window.location.hostname + '/signed/' + toFetchFor)
  )}`
)
export default shareTweet