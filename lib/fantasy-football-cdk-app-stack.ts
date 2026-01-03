import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';



export class FantasyFootballCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, 'testLambda', {
      runtime: lambda.Runtime.NODEJS_24_X,
      entry: 'lambda/index.js',
      handler: 'handler'
    });

    const api = new apigateway.RestApi(this, 'testApiGateway', {
      restApiName: 'My test lambda API',
      description: 'API Gateway integrated with Lambda',
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(handler);

    const test = api.root.addResource('test');
    test.addMethod('GET', lambdaIntegration);

  }
}
