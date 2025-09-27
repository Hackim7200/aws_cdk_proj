import * as cdk from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
export class PhotosStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // if you use same id it can cause crash, so use unique id
    new Bucket(
      this,
      "PhotosBucket", // this is the logical id and is important and must be unique
      {}
    );
  }
}
