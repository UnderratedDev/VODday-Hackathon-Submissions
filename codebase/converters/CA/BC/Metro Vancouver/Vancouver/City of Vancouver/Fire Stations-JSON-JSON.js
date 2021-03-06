module.exports =
    {
doConvert: function(data)
{
    return convert(data);
}
};

function convert(data)
{
    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];

    var lines = data.split('\n');

    // Skip first line, it is titles
    for(var i = 1;i < lines.length;i++)
    {
        const line = lines[i];

        if(line.length == 0)
        {
            continue;
        }

        const fields = line.split(',');

        var feature       = {};
        var geometry      = {};
        var properties    = {};

        feature.type       = "Feature";
        feature.geometry   = geometry;
        feature.properties = properties;

        geometry.type = "Point";
        geometry.coordinates =
            [
                parseFloat(fields[2]),
                parseFloat(fields[1])
            ]

        properties.name = fields[0];
        properties.address = fields[3];

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
