import * as cdk from "aws-cdk-lib";
import { CfnOutput, Fn } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly photosBucketArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.intialiseSuffix();

    // if you use same id it can cause crash, so use unique id
    const photosBucket = new Bucket(this, "PhotosBucket2", {
      bucketName: `photos-bucket-${this.stackSuffix}`,
    });
    this.photosBucketArn = photosBucket.bucketArn;
  }
  private intialiseSuffix() {
    //arn:aws:cloudformation:eu-west-2:759135634975:stack/PhotosStack/81df3d70-9b77-11f0-8569-0a9c6218fc95
    // take the last part of the stack id
    const shortStackId = Fn.select(2, Fn.split("/", this.stackId));
    // 81df3d70-9b77-11f0-8569-0a9c6218fc95
    // take the last part of the stack suffix
    this.stackSuffix = Fn.select(4, Fn.split("-", shortStackId));
  }
}
