# Azure EventHub consumer sample

# Getting started

## Create an event hub

```
az group create -l $LOCATION --name $GROUP_NAME
az group deployment create --template-file templates/eventhub.json -g $GROUP_NAME
```

## Get conneciton string

```
az eventhubs namespace authorization-rule keys list -g $GROUP_NAME --namespace $NAMESPACE_NAME --name RootManageSharedAccessKey --query primaryConnectionString -o tsv
```

## Run

Define environment variables.

```
export EVENTHUB_CONNECTION_STRING='your connection string'
export EVENTHUB_CONSUMER_GROUP='$Default'
export EVENTHUB_NAME='your eventhub name'
```

Build and open `dist/index.html` file.

```
npm run build
```

Execute producer.

```
node src/producer/send-event.js
```
