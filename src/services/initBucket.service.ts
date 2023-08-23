import { S3 } from 'aws-sdk';

import checkBucket from './checkBucket.service';
import createBucket from './createBucket.service';
import config from 'config';

/**
 * @name initBucket
 * @returns {void}
 */
const initBucket = async (s3: S3) => {
  const bucketStatus = await checkBucket(s3, config.get<string>('bucketName'));

  if (!bucketStatus.success) {
    // check if the bucket don't exist
    let bucket = await createBucket(s3); // create new bucket
    console.log(bucket.message);
  }
};

export default initBucket;
