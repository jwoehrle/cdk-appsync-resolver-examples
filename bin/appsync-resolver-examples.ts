#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppsyncResolverExamplesStack } from '../lib/appsync-resolver-examples-stack';

const app = new cdk.App();
new AppsyncResolverExamplesStack(app, 'AppsyncResolverExamplesStack', {
    env: { account: '488179156133', region: 'eu-west-1'}
});