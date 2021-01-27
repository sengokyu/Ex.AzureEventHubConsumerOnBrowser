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

Run server and pen http://localhost:9080/

```
npm run serve
```

Execute producer.

```
node src/producer/send-event.js
```
