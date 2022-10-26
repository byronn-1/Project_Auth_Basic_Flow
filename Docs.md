# Run-through for new project creation

## CREATE NEW TYPESCRIPT REACT PROJ
npx create-react-app my-app --template typescript

## DEPENDENCIES:

"@aws-amplify/auth":
"@aws-amplify/core":
"@reduxjs/toolkit": 
"react-redux": 
"react-router-dom": 
"redux-thunk": 

npm install aws-amplify --save
npm i @aws-amplify/core --save
npm install @reduxjs/toolkit
npm install react-redux
npm install --save @types/react-router-dom
npm install redux-thunk

[redux-thunk info](https://www.npmjs.com/package/redux-thunk)

## TESTING DEPENDENCIES

"@testing-library/jest-dom":
"@testing-library/react":
"@testing-library/user-event": 
"@types/jest":
"cypress": 
"env-cmd": 
"jest-fetch-mock":



## INSTALL AWS CDK

### add .env and .env.local
Don't forget to .gitignore them!

### add the AWS-CDK to the project
[AWS-CDK](https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html)
remember: name the of the project should match the folder 
mkdir project-name
cd project-name

cdk init app --language typescript


npm run build

cdk bootstrap aws://AWS_ACCOUNT_NUMBER/REGION [--profile AWS_PROFILE] --context env=dev

cdk synth

If you received an error like --app is required..., it's probably because you are running the command from a subdirectory. Navigate to the main app directory and try again.

## Deploying the stack
**remember:** to only deploy CloudFront when you need to at the end of the setup/build

cdk deploy

To see these changes, we'll use the cdk diff command.

cdk diff

## AWS-CDK Constructs

# CfnOutput
[CfnOutput](https://bobbyhadz.com/blog/aws-cdk-outputs)
[AWS's docs](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.CfnOutput.html)
CfnOutput- Outputs are values that we can import into other stacks or simply redirect to a file on the local file system. For instance, we can output the name of an S3 bucket or the domain name of an API.

# CfnAuthorizer
[AWS's docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.CfnAuthorizer.html)
The AWS::ApiGateway::Authorizer resource creates an authorization layer that API Gateway activates for methods that have authorization enabled. API Gateway activates the authorizer when a client calls those methods.

