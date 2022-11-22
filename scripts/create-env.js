const fs = require('fs');

if (!fs.existsSync('./.env')) {
  fs.writeFileSync(
    './.env',
    `TG_BOT_TOKEN=${process.env.TG_BOT_TOKEN}\nTG_MANAGER_ID=${process.env.TG_MANAGER_ID}\nSITE_URL=${process.env.SITE_URL}`,
  );
}
