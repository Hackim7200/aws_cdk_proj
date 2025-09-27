import * as cdk from "aws-cdk-lib";
import { Fn } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotosHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);
// lambda needs a reference to the bucket

    new LambdaFunction(this, "PhotosHandler", {
      runtime: Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: Code.fromInline(
        `export const handler = async (event: any) => {console.log("Hello World"+process.env.TARGET_BUCKET);};`
      ),
      environment: {
        TARGET_BUCKET: props.targetBucketArn,
      },
    });
  }
}
