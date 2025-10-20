# SingleScan mobile app

<p align = "justify">
If you happen to have books or DVDs that you no longer need, several UK retailers will buy your pre-owned items. Each retailer has their own mobile app that you use to can scan the book's barcode and find out what price they offer. If you wanted to get the best price, that would mean a lot of scanning and switching between apps to find the best offer. 

If you happen to have books or DVDs that you no longer need, several UK retailers will buy your pre-owned items. Each retailer has their own mobile app that you use to can scan the book's barcode and find out what price they offer. If you wanted to find the best offer, that would mean a lot of scanning and switching between apps to find the best offer. 

**SingleScan is a mobile application that allows you to find the best price for reselling books with a single scan of the barcode.**

</p>

## How to use the app

<p align = "justify">
When the app is first started on a new device, it will need permissions to use camera. Press the "Camera Permissions" button to grant temporary or permanent camera access. The app will not work without access to camera because it is needed to scan barcodes. 

When camera permissions are granted, a "Start Scanning" button will appear on the screen. Press the button to access the main screen.

On the main screen, there is a camera window and four retailer cards. These retailer cards will display offer information once a barcode is scanned. Currently SingleScan checks offers at **WeBuyBooks**, **World of Books** (former Ziffit), **Sell It Back** and **Cex**.

Place the barcode in the view of the camera window. Once SingleScan detects a new barcode, it will send requests out to the retailer APIs. The scanned barcode will be spelled out above the camera window. Once responses are received from the retailers, information will be displayed on the retailer cards. Once all responses are received, the camera window will start looking for the next barcode to scan. You can cancel requests that are taking too long by pressing "Scan Next Barcode" button in the center of the camera screen. 

Where available, each retailer card will display the book cover, author, title and the range of maximum to minimum amount a retailer will pay to buy your item. All featured retailers except for Cex will pay something for almost any item, if it is one of the first four items scanned into the resale order. Hence the minimum price is a more reliable indicator whether the retailer is actually looking to buy the item. Barcodes that are not recognised by the retailer will be displayed as *Unknown Item*. Items that the retailer does not accept under any circumstances will be displayed as *No Offer*.

</p>

<p align = "center">
<img height= "500" src ="https://raw.githubusercontent.com/VikSil/SingleScan/refs/heads/trunk/screenshots/01_camera_permissions.jpg" alt="Statistics 101 website demo GIF"/>
<img height= "500" src ="https://raw.githubusercontent.com/VikSil/SingleScan/refs/heads/trunk/screenshots/02_start_scanning.jpg" alt="Statistics 101 website demo GIF"/>
<img height= "500" src ="https://raw.githubusercontent.com/VikSil/SingleScan/refs/heads/trunk/screenshots/03_new_screen.jpg" alt="Statistics 101 website demo GIF"/>
<img height= "500" src ="https://raw.githubusercontent.com/VikSil/SingleScan/refs/heads/trunk/screenshots/04_in_flight.jpg" alt="Statistics 101 website demo GIF"/>
<img height= "500" src ="https://raw.githubusercontent.com/VikSil/SingleScan/refs/heads/trunk/screenshots/05_done.jpg" alt="Statistics 101 website demo GIF"/>
</p>


## How to start the app

<p align = "justify">

You will need *Node.js*, *nmp*, *npx* and *expo* pre-installed in your development environment. You will also need a physical mobile device with either [Expo Go app](https://expo.dev/go) installed or Developer Options and USB Installation enabled.

1. Clone the repo

1. Run `npm install`

1. To run via Expo Go, execute `npx expo start` in the command line and scan the barcode with Expo Go in your mobile device.

1. To install the the app directly onto your mobile device follow [this](https://www.youtube.com/watch?v=M0fX3VpIiN8) tutorial.

</p>
