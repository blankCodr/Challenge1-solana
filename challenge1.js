const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// User input public key
var ui_publicKey= process.argv.slice(2);
const newPair = new Keypair();

// Extract the public and private key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key of the generated keypair: ", publicKey);

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
  try {
      // Connect to the Devnet
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const walletBalance = await connection.getBalance(
          new PublicKey(ui_publicKey)
      );
      console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
  } 
  // Error catcher if the private key is invalid
  catch (err) {
      console.log(err);
  }
};

// Airdrop SOL tokens to user specified wallet
const airDropSol = async () => {
  try {
      // Connect to the Devnet and make a wallet from privateKey
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      // Request airdrop of 2 SOL to the wallet
      console.log("Airdropping some SOL to this wallet address: " + ui_publicKey);
      const fromAirDropSignature = await connection.requestAirdrop(
          new PublicKey(ui_publicKey),
          2 * LAMPORTS_PER_SOL
      );
      // Track if the transaction has succeed
      await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
      console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
}

// In order to run this you can type (node challenge1.js) on your terminal
//Notes: Remove MyWallet and 

mainFunction();
