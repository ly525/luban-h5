
# Database: lubanh5
# user: lubanh5@gmail.com
# password: lubanh5@gmail.com

# Dump of table core_store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `core_store`;

CREATE TABLE `core_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext,
  `type` varchar(255) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `SEARCH_CORE_STORE` (`key`,`value`,`type`,`environment`,`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `core_store` WRITE;
/*!40000 ALTER TABLE `core_store` DISABLE KEYS */;

INSERT INTO `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
	(1,'db_model_workforms','{\"form\":{\"type\":\"json\"},\"work\":{\"model\":\"work\"},\"created_at\":{\"type\":\"timestamp\"},\"updated_at\":{\"type\":\"timestampUpdate\"}}','object',NULL,NULL),
	(2,'db_model_core_store','{\"key\":{\"type\":\"string\"},\"value\":{\"type\":\"text\"},\"type\":{\"type\":\"string\"},\"environment\":{\"type\":\"string\"},\"tag\":{\"type\":\"string\"}}','object',NULL,NULL),
	(3,'db_model_upload_file','{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"sha256\":{\"type\":\"string\",\"configurable\":false},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"collection\":\"*\",\"filter\":\"field\",\"configurable\":false},\"created_at\":{\"type\":\"timestamp\"},\"updated_at\":{\"type\":\"timestampUpdate\"}}','object',NULL,NULL),
	(4,'db_model_users-permissions_permission','{\"type\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"controller\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"enabled\":{\"type\":\"boolean\",\"required\":true,\"configurable\":false},\"policy\":{\"type\":\"string\",\"configurable\":false},\"role\":{\"model\":\"role\",\"via\":\"permissions\",\"plugin\":\"users-permissions\",\"configurable\":false}}','object',NULL,NULL),
	(5,'db_model_works','{\"title\":{\"type\":\"string\"},\"description\":{\"type\":\"text\"},\"cover_image_url\":{\"type\":\"text\"},\"pages\":{\"type\":\"json\"},\"is_publish\":{\"type\":\"boolean\"},\"is_template\":{\"type\":\"boolean\"},\"created_at\":{\"type\":\"timestamp\"},\"updated_at\":{\"type\":\"timestampUpdate\"}}','object',NULL,NULL),
	(6,'db_model_users-permissions_role','{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"collection\":\"permission\",\"via\":\"role\",\"plugin\":\"users-permissions\",\"configurable\":false,\"isVirtual\":true},\"users\":{\"collection\":\"user\",\"via\":\"role\",\"configurable\":false,\"plugin\":\"users-permissions\",\"isVirtual\":true}}','object',NULL,NULL),
	(7,'db_model_strapi_administrator','{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true,\"required\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false}}','object',NULL,NULL),
	(8,'db_model_users-permissions_user','{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"model\":\"role\",\"via\":\"users\",\"plugin\":\"users-permissions\",\"configurable\":false},\"created_at\":{\"type\":\"timestamp\"},\"updated_at\":{\"type\":\"timestampUpdate\"}}','object',NULL,NULL),
	(9,'db_model_upload_file_morph','{\"upload_file_id\":{\"type\":\"integer\"},\"related_id\":{\"type\":\"integer\"},\"related_type\":{\"type\":\"text\"},\"field\":{\"type\":\"text\"}}','object',NULL,NULL),
	(10,'plugin_users-permissions_grant','{\"email\":{\"enabled\":true,\"icon\":\"envelope\"},\"discord\":{\"enabled\":false,\"icon\":\"comments\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/discord/callback\",\"scope\":[\"identify\",\"email\"]},\"facebook\":{\"enabled\":false,\"icon\":\"facebook-official\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/facebook/callback\",\"scope\":[\"email\"]},\"google\":{\"enabled\":false,\"icon\":\"google\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/google/callback\",\"scope\":[\"email\"]},\"github\":{\"enabled\":false,\"icon\":\"github\",\"key\":\"\",\"secret\":\"\",\"redirect_uri\":\"/auth/github/callback\",\"scope\":[\"user\",\"user:email\"]},\"microsoft\":{\"enabled\":false,\"icon\":\"windows\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/microsoft/callback\",\"scope\":[\"user.read\"]},\"twitter\":{\"enabled\":false,\"icon\":\"twitter\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/twitter/callback\"},\"instagram\":{\"enabled\":false,\"icon\":\"instagram\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/instagram/callback\"}}','object','',''),
	(11,'plugin_email_provider','{\"provider\":\"sendmail\",\"name\":\"Sendmail\",\"auth\":{\"sendmail_default_from\":{\"label\":\"Sendmail Default From\",\"type\":\"text\"},\"sendmail_default_replyto\":{\"label\":\"Sendmail Default Reply-To\",\"type\":\"text\"}}}','object','development',''),
	(12,'plugin_upload_provider','{\"provider\":\"local\",\"name\":\"Local server\",\"enabled\":true,\"sizeLimit\":1000000}','object','development',''),
	(13,'plugin_content_manager_configuration_content_types::work','{\"uid\":\"work\",\"settings\":{\"searchable\":true,\"filterable\":true,\"bulkable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Title\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"Description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Description\",\"searchable\":true,\"sortable\":true}},\"cover_image_url\":{\"edit\":{\"label\":\"Cover_image_url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Cover_image_url\",\"searchable\":true,\"sortable\":true}},\"pages\":{\"edit\":{\"label\":\"Pages\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Pages\",\"searchable\":false,\"sortable\":false}},\"is_publish\":{\"edit\":{\"label\":\"Is_publish\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Is_publish\",\"searchable\":true,\"sortable\":true}},\"is_template\":{\"edit\":{\"label\":\"Is_template\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Is_template\",\"searchable\":true,\"sortable\":true}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"description\",\"cover_image_url\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"cover_image_url\",\"size\":6}],[{\"name\":\"pages\",\"size\":12}],[{\"name\":\"is_publish\",\"size\":4},{\"name\":\"is_template\",\"size\":4}]],\"editRelations\":[]}}','object','',''),
	(14,'plugin_content_manager_configuration_content_types::workform','{\"uid\":\"workform\",\"settings\":{\"searchable\":true,\"filterable\":true,\"bulkable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"form\":{\"edit\":{\"label\":\"Form\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Form\",\"searchable\":false,\"sortable\":false}},\"work\":{\"edit\":{\"label\":\"Work\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"Work\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"created_at\",\"updated_at\"],\"edit\":[[{\"name\":\"form\",\"size\":12}]],\"editRelations\":[\"work\"]}}','object','',''),
	(15,'plugin_users-permissions_email','{\"reset_password\":{\"display\":\"Email.template.reset_password\",\"icon\":\"refresh\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"­Reset password\",\"message\":\"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>\"}},\"email_confirmation\":{\"display\":\"Email.template.email_confirmation\",\"icon\":\"check-square-o\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Account confirmation\",\"message\":\"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>\"}}}','object','',''),
	(16,'plugin_users-permissions_advanced','{\"unique_email\":true,\"allow_register\":true,\"email_confirmation\":false,\"email_confirmation_redirection\":\"http://localhost:1337/admin\",\"email_reset_password\":\"http://localhost:1337/admin\",\"default_role\":\"authenticated\"}','object','',''),
	(17,'plugin_content_manager_configuration_content_types::admin.administrator','{\"uid\":\"administrator\",\"source\":\"admin\",\"settings\":{\"searchable\":true,\"filterable\":true,\"bulkable\":true,\"pageSize\":10,\"mainField\":\"username\",\"defaultSortBy\":\"username\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"Username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"Email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Email\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"Password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"ResetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"ResetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"blocked\":{\"edit\":{\"label\":\"Blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Blocked\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"username\",\"email\",\"resetPasswordToken\"],\"edit\":[[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"resetPasswordToken\",\"size\":6}],[{\"name\":\"blocked\",\"size\":4}]],\"editRelations\":[]}}','object','',''),
	(18,'plugin_content_manager_configuration_content_types::upload.file','{\"uid\":\"file\",\"source\":\"upload\",\"settings\":{\"searchable\":true,\"filterable\":true,\"bulkable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"hash\":{\"edit\":{\"label\":\"Hash\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Hash\",\"searchable\":true,\"sortable\":true}},\"sha256\":{\"edit\":{\"label\":\"Sha256\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Sha256\",\"searchable\":true,\"sortable\":true}},\"ext\":{\"edit\":{\"label\":\"Ext\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Ext\",\"searchable\":true,\"sortable\":true}},\"mime\":{\"edit\":{\"label\":\"Mime\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Mime\",\"searchable\":true,\"sortable\":true}},\"size\":{\"edit\":{\"label\":\"Size\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Size\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"Url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Url\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"Provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Provider\",\"searchable\":true,\"sortable\":true}},\"provider_metadata\":{\"edit\":{\"label\":\"Provider_metadata\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Provider_metadata\",\"searchable\":false,\"sortable\":false}},\"related\":{\"edit\":{\"label\":\"Related\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"id\"},\"list\":{\"label\":\"Related\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"hash\",\"sha256\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"hash\",\"size\":6}],[{\"name\":\"sha256\",\"size\":6},{\"name\":\"ext\",\"size\":6}],[{\"name\":\"mime\",\"size\":6},{\"name\":\"size\",\"size\":6}],[{\"name\":\"url\",\"size\":6},{\"name\":\"provider\",\"size\":6}],[{\"name\":\"provider_metadata\",\"size\":12}]],\"editRelations\":[\"related\"]}}','object','',''),
	(19,'plugin_content_manager_configuration_content_types::users-permissions.permission','{\"uid\":\"permission\",\"source\":\"users-permissions\",\"settings\":{\"searchable\":true,\"filterable\":true,\"bulkable\":true,\"pageSize\":10,\"mainField\":\"type\",\"defaultSortBy\":\"type\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"Type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Type\",\"searchable\":true,\"sortable\":true}},\"controller\":{\"edit\":{\"label\":\"Controller\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Controller\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"Action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Action\",\"searchable\":true,\"sortable\":true}},\"enabled\":{\"edit\":{\"label\":\"Enabled\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Enabled\",\"searchable\":true,\"sortable\":true}},\"policy\":{\"edit\":{\"label\":\"Policy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Policy\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"Role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Role\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"type\",\"controller\",\"action\"],\"edit\":[[{\"name\":\"type\",\"size\":6},{\"name\":\"controller\",\"size\":6}],[{\"name\":\"action\",\"size\":6},{\"name\":\"enabled\",\"size\":4}],[{\"name\":\"policy\",\"size\":6}]],\"editRelations\":[\"role\"]}}','object','',''),
	(20,'plugin_content_manager_configuration_content_types::users-permissions.role','{\"uid\":\"role\",\"source\":\"users-permissions\",\"settings\":{\"searchable\":true,\"filterable\":true,\"bulkable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"Description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"Type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Type\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"Permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"type\"},\"list\":{\"label\":\"Permissions\",\"searchable\":false,\"sortable\":false}},\"users\":{\"edit\":{\"label\":\"Users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"Users\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6}]],\"editRelations\":[\"permissions\",\"users\"]}}','object','',''),
	(21,'plugin_content_manager_configuration_content_types::users-permissions.user','{\"uid\":\"user\",\"source\":\"users-permissions\",\"settings\":{\"searchable\":true,\"filterable\":true,\"bulkable\":true,\"pageSize\":10,\"mainField\":\"username\",\"defaultSortBy\":\"username\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"Username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"Email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Email\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"Provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Provider\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"Password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"ResetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"ResetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"confirmed\":{\"edit\":{\"label\":\"Confirmed\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Confirmed\",\"searchable\":true,\"sortable\":true}},\"blocked\":{\"edit\":{\"label\":\"Blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Blocked\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"Role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Role\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"username\",\"email\",\"provider\"],\"edit\":[[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"provider\",\"size\":6},{\"name\":\"password\",\"size\":6}],[{\"name\":\"resetPasswordToken\",\"size\":6},{\"name\":\"confirmed\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4}]],\"editRelations\":[\"role\"]}}','object','','');

/*!40000 ALTER TABLE `core_store` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table strapi_administrator
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_administrator`;

CREATE TABLE `strapi_administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strapi_administrator_username_unique` (`username`),
  FULLTEXT KEY `SEARCH_STRAPI_ADMINISTRATOR` (`username`,`resetPasswordToken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `strapi_administrator` WRITE;
/*!40000 ALTER TABLE `strapi_administrator` DISABLE KEYS */;

INSERT INTO `strapi_administrator` (`id`, `username`, `email`, `password`, `resetPasswordToken`, `blocked`)
VALUES
	(1,'lubanh5@gmail.com','lubanh5@gmail.com','$2a$10$VCup6P8Bzm7WpZXuA1Gs.eqj4MxPXWt0TF7GsULOBv24JIfqnZ7GC',NULL,NULL);

/*!40000 ALTER TABLE `strapi_administrator` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table upload_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `upload_file`;

CREATE TABLE `upload_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `sha256` varchar(255) DEFAULT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `mime` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `provider_metadata` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `SEARCH_UPLOAD_FILE` (`name`,`hash`,`sha256`,`ext`,`mime`,`size`,`url`,`provider`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `upload_file` WRITE;
/*!40000 ALTER TABLE `upload_file` DISABLE KEYS */;

INSERT INTO `upload_file` (`id`, `name`, `hash`, `sha256`, `ext`, `mime`, `size`, `url`, `provider`, `provider_metadata`, `created_at`, `updated_at`)
VALUES
	(1,'1576412230136.png','2f5a3925f70744a2bb380c0b3cb5d9eb','E8FeP3uJeKJwWtGhiFLkyV8JLU3WDe_q-mmEI2XHqaQ','.png','image/png','49.20','/uploads/2f5a3925f70744a2bb380c0b3cb5d9eb.png','local',NULL,'2019-12-15 12:17:11','2019-12-15 12:17:11'),
	(2,'1576412249784.png','0d32999b42f9405e97e1ca86598add52','eue3o_nq2oG1KJ2MLiTr1VHBBU7ET-BPNRMi6hz95GY','.png','image/png','50.44','/uploads/0d32999b42f9405e97e1ca86598add52.png','local',NULL,'2019-12-15 12:17:30','2019-12-15 12:17:30'),
	(3,'1576412276477.png','f3f806d7224d4e8d9f2144b5aaf11819','NP4b62r3H57RhlpDwrR9FvL2HeQXTRWXs_ihxZlOU1s','.png','image/png','51.19','/uploads/f3f806d7224d4e8d9f2144b5aaf11819.png','local',NULL,'2019-12-15 12:17:57','2019-12-15 12:17:57');

/*!40000 ALTER TABLE `upload_file` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table upload_file_morph
# ------------------------------------------------------------

DROP TABLE IF EXISTS `upload_file_morph`;

CREATE TABLE `upload_file_morph` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `upload_file_id` int(11) DEFAULT NULL,
  `related_id` int(11) DEFAULT NULL,
  `related_type` longtext,
  `field` longtext,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `SEARCH_UPLOAD_FILE_MORPH` (`related_type`,`field`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users-permissions_permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users-permissions_permission`;

CREATE TABLE `users-permissions_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `controller` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `policy` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `SEARCH_USERS_PERMISSIONS_PERMISSION` (`type`,`controller`,`action`,`policy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users-permissions_permission` WRITE;
/*!40000 ALTER TABLE `users-permissions_permission` DISABLE KEYS */;

INSERT INTO `users-permissions_permission` (`id`, `type`, `controller`, `action`, `enabled`, `policy`, `role`)
VALUES
	(1,'application','work','find',1,'',1),
	(2,'application','work','count',1,'',1),
	(3,'application','work','findone',1,'',1),
	(4,'application','work','delete',1,'',1),
	(5,'application','work','create',1,'',1),
	(6,'application','work','previewone',1,'',1),
	(7,'application','work','update',1,'',1),
	(8,'application','work','submitform',1,'',1),
	(9,'application','work','queryformsofonework',1,'',1),
	(10,'application','work','setastemplate',1,'',1),
	(11,'application','work','usetemplate',1,'',1),
	(12,'application','work','uploadpsd',1,'',1),
	(13,'application','work','corsproxy',1,'',1),
	(14,'application','workform','find',1,'',1),
	(15,'application','workform','findone',1,'',1),
	(16,'application','workform','count',1,'',1),
	(17,'application','workform','update',1,'',1),
	(18,'application','workform','create',1,'',1),
	(19,'content-type-builder','contenttypebuilder','getmodels',0,'',1),
	(20,'application','workform','delete',1,'',1),
	(21,'content-type-builder','contenttypebuilder','getconnections',0,'',1),
	(22,'content-type-builder','contenttypebuilder','getmodel',0,'',1),
	(23,'content-type-builder','contenttypebuilder','createmodel',0,'',1),
	(24,'content-type-builder','contenttypebuilder','deletemodel',0,'',1),
	(25,'content-type-builder','contenttypebuilder','updatemodel',0,'',1),
	(26,'content-type-builder','groups','getgroups',0,'',1),
	(27,'content-type-builder','groups','getgroup',0,'',1),
	(28,'content-type-builder','groups','creategroup',0,'',1),
	(29,'content-type-builder','groups','updategroup',0,'',1),
	(30,'content-type-builder','groups','deletegroup',0,'',1),
	(31,'content-manager','contentmanager','find',0,'',1),
	(32,'content-manager','contentmanager','findone',0,'',1),
	(33,'content-manager','contentmanager','count',0,'',1),
	(34,'content-manager','contentmanager','create',0,'',1),
	(35,'content-manager','contentmanager','update',0,'',1),
	(36,'content-manager','contentmanager','delete',0,'',1),
	(37,'content-manager','contentmanager','deletemany',0,'',1),
	(38,'content-manager','contenttypes','listcontenttypes',0,'',1),
	(39,'content-manager','contenttypes','findcontenttype',0,'',1),
	(40,'content-manager','contenttypes','updatecontenttype',0,'',1),
	(41,'content-manager','generalsettings','getgeneralsettings',0,'',1),
	(42,'content-manager','generalsettings','updategeneralsettings',0,'',1),
	(43,'content-manager','groups','listgroups',0,'',1),
	(44,'content-manager','groups','findgroup',0,'',1),
	(45,'content-manager','groups','updategroup',0,'',1),
	(46,'users-permissions','auth','callback',1,'',1),
	(47,'users-permissions','auth','changepassword',1,'',1),
	(48,'users-permissions','auth','connect',1,'',1),
	(49,'users-permissions','auth','forgotpassword',1,'',1),
	(50,'users-permissions','auth','register',1,'',1),
	(51,'users-permissions','auth','sendemailconfirmation',0,'',1),
	(52,'users-permissions','auth','emailconfirmation',1,'',1),
	(53,'users-permissions','user','find',0,'',1),
	(54,'users-permissions','user','me',1,'',1),
	(55,'users-permissions','user','findone',0,'',1),
	(56,'users-permissions','user','create',0,'',1),
	(57,'users-permissions','user','update',0,'',1),
	(58,'users-permissions','user','destroy',0,'',1),
	(59,'users-permissions','user','destroyall',0,'',1),
	(60,'users-permissions','userspermissions','createrole',0,'',1),
	(61,'users-permissions','userspermissions','deleteprovider',0,'',1),
	(62,'users-permissions','userspermissions','deleterole',0,'',1),
	(63,'users-permissions','userspermissions','getpermissions',0,'',1),
	(64,'users-permissions','userspermissions','getpolicies',0,'',1),
	(65,'users-permissions','userspermissions','getrole',0,'',1),
	(66,'users-permissions','userspermissions','getroles',0,'',1),
	(67,'users-permissions','userspermissions','getroutes',0,'',1),
	(68,'users-permissions','userspermissions','index',0,'',1),
	(69,'users-permissions','userspermissions','init',1,'',1),
	(70,'users-permissions','userspermissions','searchusers',0,'',1),
	(71,'users-permissions','userspermissions','updaterole',0,'',1),
	(72,'users-permissions','userspermissions','getemailtemplate',0,'',1),
	(73,'users-permissions','userspermissions','updateemailtemplate',0,'',1),
	(74,'users-permissions','userspermissions','getadvancedsettings',0,'',1),
	(75,'users-permissions','userspermissions','getproviders',0,'',1),
	(76,'users-permissions','userspermissions','updateadvancedsettings',0,'',1),
	(77,'users-permissions','userspermissions','updateproviders',0,'',1),
	(78,'email','email','send',0,'',1),
	(79,'email','email','getenvironments',0,'',1),
	(80,'email','email','getsettings',0,'',1),
	(81,'email','email','updatesettings',0,'',1),
	(82,'upload','upload','upload',1,'',1),
	(83,'upload','upload','getenvironments',1,'',1),
	(84,'upload','upload','getsettings',1,'',1),
	(85,'upload','upload','find',1,'',1),
	(86,'upload','upload','updatesettings',1,'',1),
	(87,'upload','upload','findone',1,'',1),
	(88,'upload','upload','count',1,'',1),
	(89,'upload','upload','destroy',1,'',1),
	(90,'upload','upload','search',1,'',1),
	(91,'application','work','find',0,'',2),
	(92,'application','work','findone',0,'',2),
	(93,'application','work','count',0,'',2),
	(94,'application','work','create',0,'',2),
	(95,'application','work','update',0,'',2),
	(96,'application','work','previewone',0,'',2),
	(97,'application','work','delete',0,'',2),
	(98,'application','work','submitform',0,'',2),
	(99,'application','work','queryformsofonework',0,'',2),
	(100,'application','work','usetemplate',0,'',2),
	(101,'application','work','setastemplate',0,'',2),
	(102,'application','work','uploadpsd',0,'',2),
	(103,'application','work','corsproxy',0,'',2),
	(104,'application','workform','find',0,'',2),
	(105,'application','workform','findone',0,'',2),
	(106,'application','workform','count',0,'',2),
	(107,'application','workform','create',0,'',2),
	(108,'application','workform','update',0,'',2),
	(109,'application','workform','delete',0,'',2),
	(110,'content-type-builder','contenttypebuilder','getmodels',0,'',2),
	(111,'content-type-builder','contenttypebuilder','getmodel',0,'',2),
	(112,'content-type-builder','contenttypebuilder','createmodel',0,'',2),
	(113,'content-type-builder','contenttypebuilder','getconnections',0,'',2),
	(114,'content-type-builder','contenttypebuilder','updatemodel',0,'',2),
	(115,'content-type-builder','contenttypebuilder','deletemodel',0,'',2),
	(116,'content-type-builder','groups','getgroups',0,'',2),
	(117,'content-type-builder','groups','getgroup',0,'',2),
	(118,'content-type-builder','groups','creategroup',0,'',2),
	(119,'content-type-builder','groups','updategroup',0,'',2),
	(120,'content-manager','contentmanager','find',0,'',2),
	(121,'content-manager','contentmanager','findone',0,'',2),
	(122,'content-type-builder','groups','deletegroup',0,'',2),
	(123,'content-manager','contentmanager','count',0,'',2),
	(124,'content-manager','contentmanager','create',0,'',2),
	(125,'content-manager','contentmanager','update',0,'',2),
	(126,'content-manager','contentmanager','delete',0,'',2),
	(127,'content-manager','contenttypes','listcontenttypes',0,'',2),
	(128,'content-manager','contentmanager','deletemany',0,'',2),
	(129,'content-manager','contenttypes','findcontenttype',0,'',2),
	(130,'content-manager','contenttypes','updatecontenttype',0,'',2),
	(131,'content-manager','generalsettings','updategeneralsettings',0,'',2),
	(132,'content-manager','generalsettings','getgeneralsettings',0,'',2),
	(133,'content-manager','groups','findgroup',0,'',2),
	(134,'content-manager','groups','listgroups',0,'',2),
	(135,'content-manager','groups','updategroup',0,'',2),
	(136,'users-permissions','auth','callback',0,'',2),
	(137,'users-permissions','auth','changepassword',0,'',2),
	(138,'users-permissions','auth','connect',1,'',2),
	(139,'users-permissions','auth','forgotpassword',0,'',2),
	(140,'users-permissions','auth','register',0,'',2),
	(141,'users-permissions','auth','emailconfirmation',0,'',2),
	(142,'users-permissions','auth','sendemailconfirmation',0,'',2),
	(143,'users-permissions','user','find',0,'',2),
	(144,'users-permissions','user','me',1,'',2),
	(145,'users-permissions','user','findone',0,'',2),
	(146,'users-permissions','user','create',0,'',2),
	(147,'users-permissions','user','update',0,'',2),
	(148,'users-permissions','user','destroyall',0,'',2),
	(149,'users-permissions','user','destroy',0,'',2),
	(150,'users-permissions','userspermissions','createrole',0,'',2),
	(151,'users-permissions','userspermissions','deleteprovider',0,'',2),
	(152,'users-permissions','userspermissions','deleterole',0,'',2),
	(153,'users-permissions','userspermissions','getpermissions',0,'',2),
	(154,'users-permissions','userspermissions','getpolicies',0,'',2),
	(155,'users-permissions','userspermissions','getrole',0,'',2),
	(156,'users-permissions','userspermissions','getroles',0,'',2),
	(157,'users-permissions','userspermissions','getroutes',0,'',2),
	(158,'users-permissions','userspermissions','index',0,'',2),
	(159,'users-permissions','userspermissions','init',1,'',2),
	(160,'users-permissions','userspermissions','searchusers',0,'',2),
	(161,'users-permissions','userspermissions','updaterole',0,'',2),
	(162,'users-permissions','userspermissions','getemailtemplate',0,'',2),
	(163,'users-permissions','userspermissions','updateemailtemplate',0,'',2),
	(164,'users-permissions','userspermissions','getadvancedsettings',0,'',2),
	(165,'users-permissions','userspermissions','updateadvancedsettings',0,'',2),
	(166,'users-permissions','userspermissions','getproviders',0,'',2),
	(167,'users-permissions','userspermissions','updateproviders',0,'',2),
	(168,'email','email','getenvironments',0,'',2),
	(169,'email','email','send',0,'',2),
	(170,'email','email','getsettings',0,'',2),
	(171,'email','email','updatesettings',0,'',2),
	(172,'upload','upload','getenvironments',0,'',2),
	(173,'upload','upload','upload',0,'',2),
	(174,'upload','upload','getsettings',0,'',2),
	(175,'upload','upload','updatesettings',0,'',2),
	(176,'upload','upload','find',0,'',2),
	(177,'upload','upload','findone',0,'',2),
	(178,'upload','upload','destroy',0,'',2),
	(179,'upload','upload','count',0,'',2),
	(180,'upload','upload','search',0,'',2);

/*!40000 ALTER TABLE `users-permissions_permission` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users-permissions_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users-permissions_role`;

CREATE TABLE `users-permissions_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users-permissions_role_type_unique` (`type`),
  FULLTEXT KEY `SEARCH_USERS_PERMISSIONS_ROLE` (`name`,`description`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users-permissions_role` WRITE;
/*!40000 ALTER TABLE `users-permissions_role` DISABLE KEYS */;

INSERT INTO `users-permissions_role` (`id`, `name`, `description`, `type`)
VALUES
	(1,'Public','Default role given to unauthenticated user.','public'),
	(2,'Authenticated','Default role given to authenticated user.','authenticated');

/*!40000 ALTER TABLE `users-permissions_role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users-permissions_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users-permissions_user`;

CREATE TABLE `users-permissions_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users-permissions_user_username_unique` (`username`),
  FULLTEXT KEY `SEARCH_USERS_PERMISSIONS_USER` (`username`,`provider`,`resetPasswordToken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table workforms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `workforms`;

CREATE TABLE `workforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form` longtext,
  `work` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `workforms` WRITE;
/*!40000 ALTER TABLE `workforms` DISABLE KEYS */;

INSERT INTO `workforms` (`id`, `form`, `work`, `created_at`, `updated_at`)
VALUES
	(1,'{\"1576407204759\":\"user01\"}',1,'2019-12-15 12:16:18','2019-12-15 12:16:48'),
	(2,'{\"1576407204759\":\"user02\"}',1,'2019-12-15 12:16:18','2019-12-15 12:16:56');

/*!40000 ALTER TABLE `workforms` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table works
# ------------------------------------------------------------

DROP TABLE IF EXISTS `works`;

CREATE TABLE `works` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `cover_image_url` longtext,
  `pages` longtext,
  `is_publish` tinyint(1) DEFAULT NULL,
  `is_template` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `SEARCH_WORKS` (`title`,`description`,`cover_image_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `works` WRITE;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;

INSERT INTO `works` (`id`, `title`, `description`, `cover_image_url`, `pages`, `is_publish`, `is_template`, `created_at`, `updated_at`)
VALUES
	(1,'标题','描述','/uploads/f3f806d7224d4e8d9f2144b5aaf11819.png','[{\"uuid\":1576412170923,\"title\":\"\",\"elements\":[{\"name\":\"lbp-background\",\"uuid\":1576404484023,\"pluginProps\":{\"uuid\":1576404484023},\"commonStyle\":{\"top\":100,\"left\":100,\"width\":100,\"height\":40,\"textAlign\":\"center\",\"color\":\"#000000\",\"backgroundColor\":\"rgba(255, 255, 255, 0)\",\"fontSize\":14},\"events\":[],\"animations\":[]},{\"name\":\"lbp-text\",\"uuid\":1576404494347,\"pluginProps\":{\"uuid\":1576404494347,\"backgroundColor\":\"rgba(255, 255, 255, 0.2)\",\"borderWidth\":0,\"borderRadius\":0,\"borderColor\":\"#ced4da\",\"text\":\"<h2 class=\\\"ql-align-center\\\">欢迎使用 鲁班H5</h2><p><br></p><p><span style=\\\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\\\">鲁班H5是基于Vue2.0开发的，通过拖拽的形式，生成页面的工具，类似</span><a href=\\\"http://www.eqxiu.com/\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\" style=\\\"color: rgb(65, 131, 196); background-color: rgb(255, 255, 255);\\\">易企秀</a><span style=\\\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\\\">、</span><a href=\\\"https://h5.baidu.com/\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\" style=\\\"color: rgb(65, 131, 196); background-color: rgb(255, 255, 255);\\\">百度 H5</a><span style=\\\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\\\">&nbsp;等工具</span></p><p><br></p><p><span style=\\\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\\\">﻿</span></p><p><strong style=\\\"background-color: rgb(255, 255, 255);\\\"><em><u>我们的初心也是希望能通过工程化的手段，大幅度提高简单H5页面的制作效率，提高工程师的幸福感，从这种需求频繁变更的简单任务中解脱出来</u></em></strong></p>\"},\"commonStyle\":{\"top\":30,\"left\":26,\"width\":256,\"height\":351,\"textAlign\":\"center\",\"color\":\"#000000\",\"backgroundColor\":\"rgba(255, 255, 255, 0)\",\"fontSize\":14},\"events\":[],\"animations\":[]},{\"name\":\"lbp-form-button\",\"uuid\":1576407196188,\"pluginProps\":{\"uuid\":1576407196188,\"text\":\"Submit\",\"vertical\":false,\"backgroundColor\":\"rgba(255, 255, 255, 0.2)\",\"color\":\"#000000\",\"fontSize\":14,\"lineHeight\":1,\"borderWidth\":1,\"borderRadius\":0,\"borderColor\":\"#ced4da\",\"textAlign\":\"center\",\"disabled\":false},\"commonStyle\":{\"top\":371,\"left\":100,\"width\":100,\"height\":40,\"textAlign\":\"center\",\"color\":\"#000000\",\"backgroundColor\":\"rgba(255, 255, 255, 0)\",\"fontSize\":14},\"events\":[],\"animations\":[]},{\"name\":\"lbp-form-input\",\"uuid\":1576407204759,\"pluginProps\":{\"uuid\":1576407204759,\"type\":\"text\",\"disabled\":false,\"placeholder\":\"username\",\"fontSize\":14,\"color\":\"#000000\",\"backgroundColor\":\"rgba(255, 255, 255, 0.2)\",\"borderColor\":\"#ced4da\",\"borderWidth\":1,\"borderRadius\":0,\"lineHeight\":1,\"textAlign\":\"left\"},\"commonStyle\":{\"top\":296,\"left\":100,\"width\":100,\"height\":40,\"textAlign\":\"center\",\"color\":\"#000000\",\"backgroundColor\":\"rgba(255, 255, 255, 0)\",\"fontSize\":14},\"events\":[],\"animations\":[]}]}]',0,0,'2019-12-15 12:12:45','2019-12-15 12:17:58');

/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;
