#!/bin/sh
# Runs as root (the image's default USER), fixes ownership on whatever is
# mounted at /app/pb_data, then drops to the unprivileged pbuser to run
# PocketBase itself.
#
# Why this exists: the image chowns /app/pb_data to pbuser at BUILD time, but
# a platform volume (Railway, or a fresh named volume in docker-compose) is
# mounted at CONTAINER START time, replacing that directory's backing storage
# with a root-owned, freshly-provisioned one. The earlier chown never touches
# it, so pbuser has no write access and PocketBase's sqlite fails with
# "unable to open database file" in a restart loop.
set -e

chown -R pbuser:pbuser /app/pb_data

exec su pbuser -c "$*"
