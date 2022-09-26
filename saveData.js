const fs = require('fs');
const path = require('path');

function saveData(filePath, folder, overwrite) {

    fs.readdir(__dirname + '/data', function (err, files) {
        if (err) {
            console.log(err);
            
        } else {
            fs.mkdir(path.join(__dirname, 'users'), function (err) {
                if (err) {
                    console.log("Folder istnieje");
                } else {
                    console.log('Stworzono folder');
                }
            });

            files.forEach(function (file) {

                fs.readFile(path.join(__dirname, 'data', file), 'utf8', function (err, data) {

                    let name = "";
                    let street = "";
                    let zipCode = "";
                    let city = "";
                    let phone = "";
                    let index = 0

                    if (err) {
                        console.log(err);

                    } else {
                        let usersData = JSON.parse(data);

                        for (let userData of usersData) {

                            index++
                            name = userData.name;
                            street = userData.address.street;
                            zipCode = userData.address.zipcode;
                            city = userData.address.city;
                            phone = userData.phone;

                            let fileContent = name + "\n" + street + "\n" + zipCode + "\n" + city + "\n" + phone;

                            if (overwrite === false){
                                console.log("Dane zostały juz zapisane.");
                            } else {
                                fs.writeFile(path.join(__dirname, 'users', `${index}.${name}` + (index) + '.txt'), fileContent, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('Stworzono plik');
                                    }
                                })
                            } 
                        }
                    }
                });
            });
        }
    });
}

module.exports = saveData;