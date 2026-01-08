const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const readline = require("readline")

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session")

  const sock = makeWASocket({
    auth: state
  })

  sock.ev.on("creds.update", saveCreds)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question("📱 WhatsApp number (94xxxxxxxxx): ", async (number) => {
    const code = await sock.requestPairingCode(number)
    console.log("🔢 PAIRING CODE:", code)
    rl.close()
  })
}

startBot()
