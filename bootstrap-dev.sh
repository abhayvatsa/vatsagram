set -eou pipefail

# Note this was only tested on my mac (Big Sur)
export CDN_HOST=$(ifconfig en0 | grep inet\ | awk '{ print $2 }')
