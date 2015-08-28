# Docker environment vars
# NOTE: only static vars not intended to be changed by users should appear here, because
#       this file gets sourced in the middle of server_start.sh, so it will override
#       any env vars set in the docker run command line.
DEPLOY_HOSTS="localhost"

APP_USER=root
APP_GROUP=stuff

INSTALL_DIR=/root/spark-jobserver
PIDFILE=spark-jobserver.pid
SPARK_HOME=/usr/local/spark
SPARK_CONF_DIR=$SPARK_HOME/conf
SCALA_VERSION=2.10.4
# For Docker, always run start script as foreground
# JOBSERVER_FG=1
