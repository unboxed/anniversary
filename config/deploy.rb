# config valid only for current version of Capistrano
lock '3.4.0'

set :application, "10.ubxd.com"
set :scm, :copy
set :use_sudo, false
set :domain, ''
set :user, 'deploy'
set :include_dir, 'dist'
set :tar_roles, :all

before :deploy, :update_code do
  run_locally do
    execute :rm, '-rf', 'dist/*'
    execute :gulp 
  end
end
after :deploy, :create_release do
    on roles(fetch(:tar_roles, :all)) do
      # Clear up OS X resource fork spoor files
      #execute :find, "#{release_path}/dist", '-name', '"._*"', '-print0', '|', 'xargs', '-0', 'rm'
      #execute :rm, '-f', "#{release_path}/._dist"
      execute :mv, "#{release_path}/dist", "#{release_path}/app"
  end
end
