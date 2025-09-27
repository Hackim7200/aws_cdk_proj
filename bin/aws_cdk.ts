#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AwsCdkStack } from "../lib/aws_cdk-stack";
import { PhotosStack } from "../lib/PhotosStack";

const app = new cdk.App();
// these are the stacks that will be added to cloudformation 
new AwsCdkStack(app, "AwsCdkStack", {});
new PhotosStack(app, "PhotosStack", {});
