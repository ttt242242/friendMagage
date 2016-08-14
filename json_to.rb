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

data[:edges] ={}
data[:edges][users_name[0].to_sym] = {}

users_name.each_with_index do |u, i|
  if i != 0
    data[:edges][users_name[0].to_sym][u.to_sym]={}
  end
# data[:edges][users_name[0].to_sym] = {users_name[2].to_sym => {},users_name[3].to_sym => {} }
end

data = JSON.pretty_generate(data)
open("graph_data.json",  'w') do |io|
    JSON.dump(data,  io)
end

json_file_path = './favo.json'

favo = open(json_file_path) do |io|
  JSON.load(io)
end

favo_hash = {}
favo.each do |f|
  if favo_hash[f] == nil
    favo_hash[f] = 1
  else
    favo_hash[f] += 1
  end

end

favo_hash = JSON.pretty_generate(favo_hash)
open("favo_data.json",  'w') do |io|
    JSON.dump(favo_hash,  io)
end


