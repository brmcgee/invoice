const vendor = [
    {
        'vendorId' : 0,
        'name' : 'Slack Overhead Doors',
        'address' : '455 E Pittsburgh McKeesport Blvd',
        'city' : 'North Versailles',
        'state' : 'PA',
        'zip' : '15137',
        'phone' : '412-678-2929',
        'email' : 'brianrmcgee@gmail.com',
        'img' : 'https://office.boxcar.site/backoffice/src/public/assets/logos/slack-300-400.png'
    },
    {
        'vendorId' : 1,
        'name' : 'Brian McGee',
        'address' : 'PO Box 66',
        'city' : 'Hannstown',
        'state' : 'PA',
        'zip' : '15635',
        'phone' : '724-787-3758',
        'email' : 'brianrmcgee@gmail.com',
        'img' : 'https://cdn-icons-png.flaticon.com/512/10948/10948348.png'
    },
    {
        'vendorId' : 2,
        'name' : 'US Garage Door',
        'address' : '1619 Federal Hwy',
        'city' : 'Pittsbrugh',
        'state' : 'PA',
        'zip' : '16330',
        'phone' : '412-963-7854',
        'email' : 'brm_dev@outlook.com',
        'img' : 'https://cdn-icons-png.flaticon.com/512/10948/10948348.png'
    },
    {
        'vendorId' : 3,
        'name' : 'Attn',
        'address' : 'Address',
        'city' : '',
        'state' : '',
        'zip' : '',
        'phone' : '',
        'email' : 'brm_dev@outlook.com',
        'img' : 'https://cdn-icons-png.flaticon.com/512/10948/10948348.png'
    },
    {
        'vendorId' : 4,
        'name' : 'Door America',
        'address' : '123 Main St',
        'city' : 'Pittsburgh',
        'state' : 'PA',
        'zip' : '16797',
        'phone' : '412-523-9536',
        'email' : 'brianmcgee@live.com',
        'img' : 'https://cdn-icons-png.flaticon.com/512/10948/10948348.png'
    },
    {
        'vendorId' : 5,
        'name' : 'Tri State Doors',
        'address' : '123 Main St',
        'city' : 'Pittsburgh',
        'state' : 'PA',
        'zip' : '16797',
        'phone' : '412-523-9536',
        'email' : 'brian@boxcar.site',
        'img' : 'https://cdn-icons-png.flaticon.com/512/10948/10948348.png'
    },
    {
        'vendorId' : 6,
        'name' : 'Americana Doors',
        'address' : '123 Main St',
        'city' : 'Pittsburgh',
        'state' : 'PA',
        'zip' : '16797',
        'phone' : '412-523-9536',
        'email' : 'brian@mcgee.boxcar',
        'img' : 'https://cdn-icons-png.flaticon.com/512/10948/10948348.png'
    },
    {
        'vendorId' : 7,
        'name' : 'H Shenk',
        'address' : '123 Main St',
        'city' : 'Pittsburgh',
        'state' : 'PA',
        'zip' : '16797',
        'phone' : '412-523-9536',
        'email' : 'hmcgee24@excelahelth.net',
        'img' : 'https://cdn-icons-png.flaticon.com/512/10948/10948348.png'
    }      
];

const products = [
    {
        'prodId' : 0,
        'item' : "Residential opener",
        'description' : 'opener install only',
        'cost' : 80,
        'unit' : 'each'
    },
    {
        'prodId' : 1,
        'item' : "Double 12-14ft door",
        'description' : 'door install only',
        'cost' : 315,
        'unit' : 'each'
    },
    {
        'prodId' : 2,
        'item' : "Double 14-16ft door",
        'description' : 'door install only',
        'cost' : 340,
        'unit' : 'each'
    },
    {
        'prodId' : 3,
        'item' : "Single 8-10ft door",
        'description' : 'door install only',
        'cost' : 210,
        'unit' : 'each'
    },
    {
        'prodId' : 4,
        'item' : "Aluminum trim",
        'description' : 'fabricate/install only',
        'cost' : 2,
        'unit' : 'ft'
    },
    {
        'prodId' : 5,
        'item' : "Wood jamb - 1x/2x",
        'description' : 'wood work install only',
        'cost' : 2,
        'unit' : 'ft'
    },
    {
        'prodId' : 6,
        'item' : "Lockbar/Snaplatch",
        'description' : 'install only',
        'cost' : 15,
        'unit' : 'each'
    },
    {
        'prodId' : 7,
        'item' : "Deco Handle/Hinge",
        'description' : 'install only',
        'cost' : 10,
        'unit' : 'each'
    },
    {
        'prodId' : 8,
        'item' : "Misc",
        'description' : 'Misc labor charge',
        'cost' : 1,
        'unit' : 'each'
    },
    {
        'prodId' : 9,
        'item' : "Hourly labor",
        'description' : 'Hourly labor charge',
        'cost' : 45,
        'unit' : 'hour'
    },
    {
        'prodId' : 10,
        'item' : "Trip charge",
        'description' : 'standard trip charge',
        'cost' : 55,
        'unit' : 'each'
    },
    {
        'prodId' : 11,
        'item' : "Electrical misc",
        'description' : 'Receptacle outlet labor charge',
        'cost' : 55,
        'unit' : 'each'
    },
    {
        'prodId' : 12,
        'item' : "Classica 8-10",
        'description' : 'install only - insulated',
        'cost' : 240,
        'unit' : 'each'
    },
    {
        'prodId' : 13,
        'item' : "Classica 11+",
        'description' : 'install only - insulated',
        'cost' : 400,
        'unit' : 'each'
    },
    {
        'prodId' : 14,
        'item' : "Double Insulated 12+",
        'description' : '12ft + install- insulated',
        'cost' : 375,
        'unit' : 'each'
    },
    {
        'prodId' : 15,
        'item' : "Single Insulated 8-10",
        'description' : '8ft - install- insulated',
        'cost' : 230,
        'unit' : 'each'
    },
    {
        'prodId' : 16,
        'item' : "2ft height add",
        'description' : '2ft height increments above 7ft',
        'cost' : 25,
        'unit' : 'each'
    },
    {
        'prodId' : 17,
        'item' : "Spring install",
        'description' : 'install only spring',
        'cost' : 800,
        'unit' : 'each'
    },
    {
        'prodId' : 18,
        'item' : "Service call",
        'description' : 'standard labor service call labor only',
        'cost' : 75,
        'unit' : 'each'
    },
    {
        'prodId' : 19,
        'item' : "Debris Removal",
        'description' : 'standard labor to remove debris',
        'cost' : 75,
        'unit' : 'hr'
    },
    {
        'prodId' : 20,
        'item' : "Disposal",
        'description' : 'disposal charge',
        'cost' : 25,
        'unit' : 'each'
    }
];