import * as cdk from "aws-cdk-lib";
import { CfnOutput, CfnParameter, Duration } from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const duration = new CfnParameter(this, "duration", {
      default: 3,
      minValue: 1,
      maxValue: 10,
      type: "Number",
    });

    const myL2Bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(duration.valueAsNumber),
        },
      ],
    });

    new CfnOutput(this, "MyL2BucketName", {
      value: myL2Bucket.bucketName,
    });

    console.log("Bucket Name: " + myL2Bucket.bucketName);
  }
}
