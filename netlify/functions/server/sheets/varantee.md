---
title: vagrantee
link: https://github.com/jayfreestone/vagrantee
---
# -*- mode: ruby -*- # vi: set ft=ruby : # Vagrantfile API/syntax version. Don't touch unless you know what you're doing! VAGRANTFILE_API_VERSION = "2" Vagrant.configure(VAGRANTFILE_API_VERSION) do |config| # Every Vagrant virtual environment requires a box to build off of. config.vm.box = "hashicorp/precise64" # EasyEngine Setup config.vm.provision :shell, path: "easyengine.sh" # Share an additional folder to the guest VM. config.ssh.forward_agent = true config.vm.synced_folder "www/", "/var/www/", :owner => "www-data", :mount_options => [ "dmode=775", "fmode=774" ] config.vm.provider :virtualbox do |v| v.customize ["modifyvm", :id, "--memory", 512] v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"] v.customize ["modifyvm", :id, "--natdnsproxy1", "on"] end config.vm.network :private_network, ip: "192.168.50.4" end
