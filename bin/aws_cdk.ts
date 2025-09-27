#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";

import { PhotosStack } from "../lib/PhotosStack";
import { PhotosHandlerStack } from "../lib/PhotosHandlerStack";

const app = new cdk.App();
// these are the stacks that will be added to cloudformation 
new PhotosStack(app, "PhotosStack");
new PhotosHandlerStack(app, "PhotosHandlerStack");
