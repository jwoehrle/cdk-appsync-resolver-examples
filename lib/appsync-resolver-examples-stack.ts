import * as cdk from 'aws-cdk-lib';
import {BundlingOutput, DockerImage} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import {RetentionDays} from "aws-cdk-lib/aws-logs";
import * as path from "path";

export class AppsyncResolverExamplesStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const api = new appsync.GraphqlApi(this, 'Api', {
            name: 'Typescript-Resolver',
            schema: appsync.SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql')),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.IAM,
                },
            },
            xrayEnabled: true,
            logConfig: {
                fieldLogLevel: appsync.FieldLogLevel.ALL,
                excludeVerboseContent: false,
                retention: RetentionDays.ONE_DAY,
            }
        });

        const noneDS = api.addNoneDataSource('NoneDS');



        api.createResolver('GetTodoResolver', {
            typeName: 'Query',
            fieldName: 'getTodoWithUnitResolver',
            runtime: appsync.FunctionRuntime.JS_1_0_0,
            code: appsync.Code.fromAsset(path.join(__dirname, '..', 'resolvers'), {
                bundling: {
                    outputType: BundlingOutput.SINGLE_FILE,
                    image: DockerImage.fromRegistry('public.ecr.aws/docker/library/node:18.18.0-slim'),
                    environment: {
                        NPM_CONFIG_PREFIX: '/tmp/.npm-global',
                        NPM_CONFIG_CACHE: '/tmp/.npm-cache',
                        NODE_OPTIONS: '--dns-result-order=ipv4first',
                    },
                    command: ['bash', '-c', ['npm install', 'npm run build','npm run dist', 'cp dist/appsync/todo-resolver.js /asset-output/todo-resolver.jar',].join(' && '),]
                }
            }),
          dataSource: noneDS
        });
    }
}
