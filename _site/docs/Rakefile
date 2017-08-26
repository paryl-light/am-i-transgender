require 'html-proofer'

task :test do
  HTMLProofer.check_directories(
    ["./docs"], {
      :allow_hash_href => true,
      :parallel => {:in_processes => 4},
      :only_4xx => true,
      :url_ignore => ["/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?facebook\.com(?:/.*)?$/",
                      "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?twitter\.com(?:/.*)?$/",
		 			  "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?youtube\.com(?:/.*)?$/",
		              "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?pinterest\.com(?:/.*)?$/",
                      "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?instagram\.camp(?:/.*)?$/"],
      :empty_alt_ignore => false,
      :verbose => true,
      :typhoeus => {
        :timeout => 3 }
    }).run
end