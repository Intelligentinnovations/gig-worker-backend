import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSource from 'aws-cdk-lib/aws-lambda-event-sources';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

import { secrets } from './secrets';

export class NotificationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topicArn = cdk.Fn.importValue(
      `${secrets.APP_NAME}-app-${secrets.ENV}-TopicArn`
    );

    const handler = new lambda.Function(this, 'NotificationHandler', {
      handler: 'main.handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('dist/apps/notification-handler'),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        MAIL_FROM: secrets.MAIL_FROM,
      },
    });

    handler.role?.attachInlinePolicy(
      new iam.Policy(this, 'SendMailPolicy', {
        statements: [
          new iam.PolicyStatement({
            actions: ['ses:SendEmail'],
            resources: ['*'],
          }),
        ],
      })
    );

    const topic = sns.Topic.fromTopicArn(this, 'AppTopic', topicArn);

    const eventSource = new lambdaEventSource.SnsEventSource(topic, {
      filterPolicyWithMessageBody: {
        action: sns.FilterOrPolicy.filter(
          sns.SubscriptionFilter.stringFilter({ allowlist: ['NOTIFICATION'] })
        ),
      },
    });

    handler.addEventSource(eventSource);
  }
}
