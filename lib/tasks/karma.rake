namespace :karma do
  desc "Launch karma, run tests and watching files; executing the tests whenever one of these files changes"
  task start: :environment do
    with_tmp_config :start
  end

  desc "Launch karma, run tests and exits with 0 exit code (if all tests passed) or 1 exit code (if any test failed)"
  task run: :environment do
    with_tmp_config :start, "--single-run"
  end

  private

  def with_tmp_config(command, args = nil)
    Tempfile.open('config.js', Rails.root.join('tmp')) do |f|
      f.write unit_js(application_spec_files)
      f.flush

      system "./node_modules/karma/bin/karma #{command} #{f.path} #{args}"
    end
  end

  def application_spec_files
    sprockets = Rails.application.assets
    sprockets.append_path(Rails.root.join("spec/javascripts"))
    Rails.application.assets.find_asset("spec_helper.js").to_a.map {|e| e.pathname.to_s }
  end

  def unit_js(files)
    unit_js = File.read('spec/karma/config.js')
    unit_js.gsub("APPLICATION_SPEC", "\"#{files.join("\",\n\"")}\"")
  end
end
