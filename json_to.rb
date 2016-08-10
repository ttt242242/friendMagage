#!/usr/bin/ruby
# -*- encoding: utf-8 -*-

$LOAD_PATH.push(File::dirname($0)) ;
require "pry"
require "yaml"
require "json"

json_file_path = './users.json'

users_name= open(json_file_path) do |io|
  JSON.load(io)
end

data={} 
data[:nodes] ={}
privios = users_name[0]
users_name.each do |u|
    data[:nodes][u] = {'color' => 'red','shape' => 'dot','label'=> u}
end

data[:edges] = {users_name[0].to_sym => {users_name[2].to_sym => {},users_name[3].to_sym => {} }}

data = JSON.pretty_generate(data)
open("graph_data.json",  'w') do |io|
    JSON.dump(data,  io)
end



