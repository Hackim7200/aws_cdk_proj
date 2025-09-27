import * as cdk from "aws-cdk-lib";
import { CfnOutput, Fn } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.generateStackSuffix();

    // if you use same id it can cause crash, so use unique id
    const photosBucket = new Bucket(
      this,
      "PhotosBucket2", // this is the logical id and is important and must be unique
      {
        bucketName: `photos-bucket-${this.stackSuffix}`, // this is the bucket name has a unique name name that wont conflict and is based on last
      }
    );
    new CfnOutput(this, "photos-bucket", {
      value: photosBucket.bucketArn,
      exportName: "photos-bucket",
    });
  }
  private generateStackSuffix() {
    //arn:aws:cloudformation:eu-west-2:759135634975:stack/PhotosStack/81df3d70-9b77-11f0-8569-0a9c6218fc95
    // take the last part of the stack id
    const shortStackId = Fn.select(2, Fn.split("/", this.stackId));

    // 81df3d70-9b77-11f0-8569-0a9c6218fc95
    // take the last part of the stack suffix
    this.stackSuffix = Fn.select(4, Fn.split("-", shortStackId));
  }
}
