let neoViz;

const config = {
    containerId: "div-graphview",
    neo4j: {
        //encrypted:"ENCRYPTION_ON",
        //trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
        serverUrl: "neo4j://285cef6e.databases.neo4j.io",
        serverUser: "neo4j",
        serverPassword: "yPTXjpvybwh0DhJOE1A8w4oye-kwO4mG8j_66781wKU",
        driverConfig: {
            encrypted: "ENCRYPTION_ON",
            trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES"
        }
    },
    labels: {
        Country:{
            caption: 'name',
            size: 4,
            community:'Country'
        },
        Territory:{
            label:'name',
            group: 'territories'
        }
    },
    relationships: {
        'TERRITORY_OF':{
            caption:true
        }
    },
    initialCypher: "MATCH (n)-[r:TERRITORY_OF]->(m) RETURN *"
};

neoViz = new NeoVis.default(config);
//neoViz.render();

